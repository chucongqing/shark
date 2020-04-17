package main

import (
	"fmt"
	"net"
	"time"
)
func main() {

	fmt.Println("start!")
	l, _ := net.Listen("tcp", ":9999")

	defer l.Close()

	const timeout = 10 * 1000

	for {

		c, _ := l.Accept()

		go func (conn net.Conn) {
			count := 0
			fmt.Println(conn.RemoteAddr().String()," Connected!")
			
			defer conn.Close()

			buf := make([]byte, 2048)

			for {
				n, _ := c.Read(buf)
				if n == 0 {
					time.Sleep(50 * time.Millisecond)
					count++;
					// fmt.Println("count : ", count)
					if  count * 50 > timeout {
						fmt.Printf("%s timeout \n", conn.RemoteAddr().String())
						break;
					} 
					continue
				}

				count = 0
				rs := ""
				for _, v := range buf[:n] {
					rs += fmt.Sprintf("%x ", v)
				}
				fmt.Printf("%s recv %d %s \n", conn.RemoteAddr().String(),n, rs)
				buf[n] = 0xff
				buf[n+1] = 0xff
				c.Write(buf[:n+2])
			}
		} (c)
	}
}