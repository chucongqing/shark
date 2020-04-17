package client

import (
	"fmt"
	"net"
	"time"
)

// FwData ...
type FwData struct {
	Buf []byte
	//len int
}

// MsClient ...
type MsClient struct {
	//fdata   FwData
	rxChan *chan FwData
	txChan *chan FwData

	exChan chan bool
	fw     *FwData
	exit   bool
}

// Init ...
func (c *MsClient) Init(remoteSrv string, fdChan []*chan FwData, exchan chan bool) {
	c.rxChan = fdChan[0]
	c.txChan = fdChan[1]

	c.exChan = exchan
	// fd := &FwData{}
	// fd.buf = make([]byte, 2048)
	// fd.len = 0
	c.exit = false
	go func() {
		<-c.exChan
		fmt.Println("get exit signal")
		c.exit = true
	}()

	c.fw = nil
	go func() {
		for {
			ff := <-*(c.rxChan)
			//fmt.Println("Get Fowerd msg")
			c.fw = &ff
		}
	}()
	go c.Conn(remoteSrv)
}

// Conn ...
func (c *MsClient) Conn(remoteSrv string) {

	conn, _ := net.Dial("tcp", remoteSrv)

	fmt.Println("Connect to > ", conn.RemoteAddr().String())

	close := func() {
		fmt.Println("close connection ", conn.RemoteAddr().String())
		conn.Close()
	}

	defer close()

	buf := make([]byte, 2048)

	cleanup := func() {
		//fmt.Println("clean fw data")
		c.fw = nil
	}

	for {

		if c.exit {
			fmt.Println("client exit!")
			return
		}

		if c.fw == nil {
			time.Sleep(50 * time.Millisecond)
			//fmt.Println("sleep")
			continue
		}

		for kk := true; kk; kk = false {

			fd := c.fw

			_, err := conn.Write(fd.Buf[:len(fd.Buf)])

			if err != nil {

				break
			}

			n, err := conn.Read(buf)

			if err != nil {

				break
			}

			rfd := FwData{}
			tmp := make([]byte, n)
			copy(tmp, buf[:n])
			rfd.Buf = tmp

			(*c.txChan) <- rfd

			//fmt.Println("Send Over")
		}

		cleanup()

	}

	//fmt.Println("????")
}
