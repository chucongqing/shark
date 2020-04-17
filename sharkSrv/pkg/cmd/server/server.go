package main

import (
	"fmt"
	TcpSrv "shark/pkg/tcpserver"
)

func main() {
	fmt.Println("this is sharkServer!")

	TcpSrv.TCPServer()
}
