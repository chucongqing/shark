package utils

import (
	"bytes"
	"encoding/binary"
	"strconv"
)

type uchar byte

// BytesTo32Int bytes to uint 32
func BytesTo32Int(b []byte) uint {
	buf := bytes.NewBuffer(b)
	var tmp uint32
	binary.Read(buf, binary.BigEndian, &tmp)
	return uint(tmp)
}

// BytesTo16Int bytes to int 16
func BytesTo16Int(b []byte) uint16 {
	buf := bytes.NewBuffer(b)
	var tmp uint16
	binary.Read(buf, binary.BigEndian, &tmp)
	return uint16(tmp)
}

//UintTo4Bytes int to 4 bytes
func UintTo4Bytes(i int) []byte {
	buf := bytes.NewBuffer([]byte{})
	tmp := uint32(i)
	binary.Write(buf, binary.BigEndian, tmp)
	return buf.Bytes()
}

// Uint16To2Bytes int to 2 bytes
func Uint16To2Bytes(i uint16) []byte {
	buf := bytes.NewBuffer([]byte{})
	binary.Write(buf, binary.BigEndian, i)
	return buf.Bytes()
}

// BytesToHexString bytes to hex string
func BytesToHexString(b []byte) string {
	var buf bytes.Buffer
	for _, v := range b {
		t := strconv.FormatInt(int64(v), 16)
		if len(t) > 1 {
			buf.WriteString(t)
		} else {
			buf.WriteString("0" + t)
		}
	}
	return buf.String()
}
