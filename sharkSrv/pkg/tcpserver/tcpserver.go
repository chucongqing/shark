package tcpserver

import (
	"fmt"
	"net"
	"strings"
)

// HandleConn 123
func HandleConn(conn net.Conn) {
	defer conn.Close()

	addr := conn.RemoteAddr().String()

	fmt.Println(addr, " connect successful!")

	buf := make([]byte, 2048)

	for {
		n, err := conn.Read(buf)
		if err != nil {
			fmt.Println("err = ", err)
			return
		}

		str := string(buf[:n])
		fmt.Printf("[%s]: %s\n len=%d", addr, str, len(str))

		if "exit" == string(str) {
			fmt.Println(addr, " exit")
			return
		}

		conn.Write([]byte(strings.ToUpper(string(buf[:n]))))
	}
}

// TCPServer ...
func TCPServer() {

	listener, err := net.Listen("tcp", ":8000")

	if err != nil {
		fmt.Println("listen err :", err)
		return
	}

	defer listener.Close()

	fmt.Println("waiting for connection ...")

	for {
		conn, err := listener.Accept()

		if err != nil {
			fmt.Println("accept err:", err)
			return
		}

		go HandleConn(conn)
	}
}
