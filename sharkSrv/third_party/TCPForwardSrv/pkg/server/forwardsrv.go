package server

import (
	"fmt"
	"gonf/pkg/client"
	"math/rand"
	"net"
	"time"
)

// SendFlag sendflag
type SendFlag uint8

const (
	sendFlagOK SendFlag = iota
	sendFlagBlock
)

func (sf SendFlag) String() string {
	return [...]string{"OK", "Block"}[sf]
}

type cFwData client.FwData

// ForwardSrv 转发服务器
type ForwardSrv struct {
	//name     string
	sendFlag SendFlag
	ExitChan chan bool
	Exit     bool
	msClient *client.MsClient
	rxdata   chan client.FwData
	txdata   chan client.FwData
}

func (fSrv *ForwardSrv) handleConnection(c net.Conn) {
	defer c.Close()

	count := 0
	const timeout = 60 * 1000

	remoteAddrStr := c.RemoteAddr().String()
	fmt.Printf("%s Connected!\n", remoteAddrStr)

	buf := make([]byte, 2048)

	for {
		if fSrv.Exit {
			return
		}
		//netData, err := bufio.NewReader(c).ReadString("\n")
		n, err := c.Read(buf)

		if err != nil {
			return
		}

		if n == 0 {
			time.Sleep(50 * time.Millisecond)
			count++
			// fmt.Println("count : ", count)
			if count*50 > timeout {
				fmt.Printf("%s timeout \n", c.RemoteAddr().String())
				break
			}
			continue
		}

		if n > 0 {

			rs := ""

			for _, v := range buf[:n] {
				rs += fmt.Sprintf("%x ", v)
			}
			fmt.Println("addr :", remoteAddrStr)
			fmt.Printf("send> %s\n", rs)

			fwd := client.FwData{}
			buf2 := make([]byte, n)
			copy(buf2, buf[:n])

			fwd.Buf = buf2

			fSrv.txdata <- fwd

			rwd := <-fSrv.rxdata

			rs = ""
			for _, v := range rwd.Buf[:len(rwd.Buf)] {
				rs += fmt.Sprintf("%x ", v)
			}
			fmt.Printf("recv> %s\n", rs)
			c.Write(rwd.Buf)
		}
	}
}

// StartSrv start server
func (fSrv *ForwardSrv) StartSrv(remoteSrv string) error {

	fSrv.Exit = false
	fSrv.ExitChan = make(chan bool)

	fSrv.rxdata = make(chan client.FwData, 10)
	fSrv.txdata = make(chan client.FwData, 10)

	fSrv.msClient = &client.MsClient{}
	msc := fSrv.msClient

	msc.Init(remoteSrv, []*chan client.FwData{&fSrv.txdata, &fSrv.rxdata}, fSrv.ExitChan)

	fSrv.sendFlag = sendFlagOK

	l, err := net.Listen("tcp4", ":9998")

	fmt.Println("Start Server ! ", l.Addr().String())

	if err != nil {
		fmt.Println(err)
		return err
	}

	defer l.Close()

	rand.Seed(time.Now().Unix())

	for {
		if fSrv.Exit {
			return nil
		}

		c, err := l.Accept()

		if err != nil {
			fmt.Println(err)
			return nil
		}

		go fSrv.handleConnection(c)
	}
	return nil
}

// ForwardMsg ...
func (fsrv *ForwardSrv) ForwardMsg() {

}

// StopSrv stop server
func (fsrv *ForwardSrv) StopSrv() {
	fsrv.Exit = true
	fsrv.ExitChan <- true
	fmt.Println("Stop Server")
}
