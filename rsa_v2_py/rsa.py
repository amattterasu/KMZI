import math
import random 
import argparse

# Расчет модульных инверсий a и b
def extendedEuclidean(a, b):
	if a == 0:
		return (b, 0, 1)
	else:
		gcd, x, y = extendedEuclidean(b % a, a)
		return (gcd, y - b//a * x, x)

# Encrypt every symbol 
def crypt(message, e, n):
	cr = [] 
	for c in message:
			cr.append(pow(ord(c), e, n))

	return cr

# Decrypt every symbol
def decrypt(message, d, n):
	dec = []
	for i in message:
			dec.append(chr(pow(int(i), d, n)))

	return dec
		
# Test Ferma
def testFerma(n):
		if n > 1:
			for t in range(50):
					rand = random.randint(2, n)-1
					if pow(rand, n - 1, n) != 1:
						return False
			return True
		else:
			return False

# Number generation
def genNum(bits):
	n = random.randint(0, pow(2, bits))
	if n % 2 == 0:
		n = n + 1

	while not testFerma(n):
		n += 2

	return (n)

# Generation of public key
def openKey(bits):
	p = genNum(bits)
	q = genNum(bits)
	while p == q:
		q = genNum(bits)

	e = random.randint(0, pow(2, 16))
	while math.gcd(e, (p - 1) * (q - 1)) != 1:
		e = random.randint(0, pow(2, 16))

	return (e, p, q)


# Generation of private key
def closeKey(e, p, q):
	d = extendedEuclidean(e, (p-1)*(q-1))[1]  # inverse element
	if d < 1:
			d = d + ((p - 1) * (q - 1))

	return (int(d), p * q)

# Auto generation keys and encrypt
def autogen():
	bits = 1024
	msg = open("msg.txt", "r")

	encrypted = open("encrypt.txt", "w")
	unencrypted = open("decrypt.txt", "w")
		
	e, p, q = openKey(bits)  # генерация открытого ключа
	d, n = closeKey(e, p, q)  # генерация закрытого ключа

	a = crypt(msg.read(), e, n)
	print('\n\n\n', 'p = ', p,'\n', 'q = ', q, '\n')

	for i in a: # write in encrypt.txt
		encrypted.write(str(i))
		encrypted.write(' ')
	encrypted.close()
	encrypted = open("encrypt.txt", "r")

	c = encrypted.read().split()

	print('Открытая экспонента (е): ', e, '\n')  # e
	print('Модуль (n): ', p * q, '\n')  # n
	print('Закрытый ключ (d): ', d, '\n' )  # d
	b = decrypt(c, d, n)
	print('Успешно! (результат в encrypt.txt)', '\n')
	print('Исходное сообщение (в файле msg.txt):', ''.join(b), '\n')

	for j in b:  # write in decrypt.txt
		unencrypted.write(str(j))
	msg.close()
	encrypted.close()
	unencrypted.close()

# Input private key and decrypt file
def decryptFile():
	unencrypted = open("decrypt.txt", "w")
	encrypted = open("encrypt.txt", "r")
	
	print('Введите n: ')
	n = int(input())
	print('Введите d: ')
	d = int(input())

	print('\n\n\n', 'n = ', n, '\n\n Закрытый ключ: ', d, '\n' )
	c = encrypted.read().split()
	b = decrypt(c, d, n)
	for z in b:  # write in decrypt.txt
		unencrypted.write(z)
	print('Расшифрованное сообщение ', ''.join(b), '\n')
	
	encrypted.close()
	unencrypted.close()

# Input public key and encrypt file
def encryptFile():
	msg = open("msg.txt", "r")

	encrypted = open("encrypt.txt", "w")

	done = 1
	while (done):
		print('\nВведите число p: ')
		p = int(input())
		if (testFerma(p)):
			done = 0
		else:
			print('\np должно быть простым\n')
			print('-------------------------------------------------------')
			done = 1

	done = 1
	while (done):
		print('\nВведите число q: ')
		q = int(input())
		if (testFerma(q)):
			done = 0
		else:
			print('\nq должно быть простым\n')
			print('-------------------------------------------------------')
			done = 1

	n = p * q

	print('\nВведите открытую экспоненту: ')
	e = int(input())

	d, n = closeKey(e, p, q)  # генерация закрытого ключа
	a = crypt(msg.read(), e, n)
	print('\n\n\n', 'p = ', p,'\n', 'q = ', q, '\n')

	for i in a: # write in encrypt.txt
		encrypted.write(str(i))
		encrypted.write(' ')
	encrypted.close()
	encrypted = open("encrypt.txt", "r")

	print('Открытая экспонента (е): ', e, '\n')  # e
	print('Модуль (n): ', p * q, '\n')  # n
	print('Закрытый ключ (d): ', d, '\n' )  # d
	b = decrypt(c, d, n)
	print('Успешно! (результат в encrypt.txt)', '\n')
	print('Исходное сообщение (в файле msg.txt):', ''.join(b), '\n')

	msg.close()
	encrypted.close()

# Start program
def main():
	usage = "py rsa.py -a \nor\n" \
						"py rsa.py -e \nor\n" \
							"py rsa.py -d"

	description = "RSA encryption/decryprion program"

	parser = argparse.ArgumentParser(usage=usage, description=description)
	parser.add_argument("-v", "--version", action="version",
												version="%(rsa_en-dec)s 2.0")

	group = parser.add_mutually_exclusive_group(required=True)

	group.add_argument("-a", "--autogen", action="store_true", dest="autogen",
											 help="Генерирует ключи и шифрует сообщение в файле msg.txt в файл encrypt.txt")

	group.add_argument("-d", "--decryptFile", action="store_true", dest="decryptFile",
											 help="Расшифровывает зашифрованное сообщение в файле encrypt.txt в файл decrypt.txt")

	group.add_argument("-e", "--encryptFile", action="store_true", dest="encryptFile",
												help="Зашифровывает сообщение в файле msg.txt в файл encrypt.txt")

	options = parser.parse_args()

	if options.autogen:
			autogen()
	elif options.decryptFile:
		decryptFile()
	elif options.encryptFile:
		encryptFile()
		
if __name__ == "__main__":
	main()