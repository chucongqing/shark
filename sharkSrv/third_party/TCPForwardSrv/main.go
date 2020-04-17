package main

import (
	"fmt"
	"gonf/pkg/server"
	"os"
	"os/signal"
	"syscall"

	// "syscall"
	"time"
)

func main() {

	// Setup our Ctrl+C handler
	SetupCloseHandler()

	fsrv := &server.ForwardSrv{}

	args := os.Args
	var remoteSrv string
	if len(args) < 2 {
		remoteSrv = "192.168.0.16:30100"
	} else {
		remoteSrv = args[1]
	}

	fmt.Println("remoteSrv :", remoteSrv)

	go fsrv.StartSrv(remoteSrv)

	c := make(chan os.Signal, 1)

	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-c
		fmt.Println("\r- Ctrl+C pressed in Terminal")
		fsrv.StopSrv()
		os.Exit(0)
	}()

	for {

		time.Sleep(10 * time.Second)

		if fsrv.Exit {
			break
		}

	}

	fmt.Println("over ?")
}

// SetupCloseHandler creates a 'listener' on a new goroutine which will notify the
// program if it receives an interrupt from the OS. We then handle this by calling
// our clean up procedure and exiting the program.
func SetupCloseHandler() {

}
