function compress(control, alt, shift, letter) {
	return String(control ? 1 : 0) + String(alt ? 1 : 0) + String(shift ? 1 : 0) + letter;
}

function decompress(compressed) {
	return [compressed[0], compressed[1], compressed[2], compressed[3]]
}