import math
import random 

# Тест Ферма
def fermatPrimalityTest(n):
		if n > 1:
				for t in range(50):
						rand = random.randint(2, n)-1
						if pow(rand, n - 1, n) != 1:
								return False
				return True
		else:
				return False


# Функция для генерации простых чисел: генерирует случайные целые числа и выполняет тест Ферма
def genNum(bits):
		n = random.randint(0, pow(2, bits))
		if n % 2 == 0:
				n = n + 1

		while not fermatPrimalityTest(n):
				n += 2

		return (n)

# Генерация открытого ключа
def openKey(bits):
	p = genNum(bits)
	q = genNum(bits)
	while p == q:
		q = genNum(bits)

	e = random.randint(0, pow(2, 16))
	while math.gcd(e, (p - 1) * (q - 1)) != 1:
		e = random.randint(0, pow(2, 16))

	return (e, p, q)

# Расчет модульных инверсий a и b
def extendedEuclidean(a, b):
	if a == 0:
		return (b, 0, 1)
	else:
		gcd, x, y = extendedEuclidean(b % a, a)
		return (gcd, y - b//a * x, x)

# Генерация закрытого ключа
def closeKey(e, p, q):
		d = extendedEuclidean(e, (p-1)*(q-1))[1]  # обратный по модулю элемент
		if d < 1:
				d = d + ((p - 1) * (q - 1))

		return (int(d), p * q)

# Шифрование 
def crypt(message, e, n):
		cr = [] 
		for c in message:
				cr.append(pow(ord(c), e, n))

		return cr

# Расшифровка
def decrypt(message, d, n):
		dec = []
		for i in message:
				dec.append(chr(pow(int(i), d, n)))

		return dec


# <!--  BEGIN IS HERE  --> #
def main():
	print("1 - Автогенерация ключей\n2 - Ввести ключи и шифровать\n3 - Ввести ключи и расшифровать\n")
	access = input() #select mode

	#авто генерация
	if (int(access) == 1):
		bits = 1024  # бит ключа
		msg = open("text.txt", "r")

		encrypted = open("encrypt.txt", "w")
		unencrypted = open("decrypt.txt", "w")

		e, p, q = openKey(bits)  # генерация открытого ключа
		d, n = closeKey(e, p, q)  # генерация закрытого ключа

		a = crypt(msg.read(), e, n)
		print('\n\n\n', 'p = ', p,'\n', 'q = ', q, '\n', 'e = ', e, '\n')

		for i in a: # запись в encrypt.txt
			encrypted.write(str(i))
			encrypted.write(' ')
		encrypted.close()
		encrypted = open("encrypt.txt", "r")

		c = encrypted.read().split()

		print('Открытый ключ: ', (e, p*q), '\n')  # открытый ключ
		print('Закрытый ключ: ', d, '\n' )  # закрытый ключ
		b = decrypt(c, d, n)
		print('Расшифрованное сообщение ', ''.join(b), '\n')
		print('Зашифрованное сообщение в файле encrypt.txt')

		for j in b:  # Записать расшифрованное сообщение в файл
			unencrypted.write(str(j))
		msg.close()
		encrypted.close()
		unencrypted.close()

	# Расшифровка
	elif (int(access) == 3): 
		unencrypted = open("decrypt.txt", "w")
		encrypted = open("encrypt.txt", "r")
		
		print('Введите n: ')
		n = int(input())
		print('Введите d: ')
		d = int(input())

		c = encrypted.read().split()
		b = decrypt(c, d, n)
		for z in b:  # записать расшифрованное сообщение в файл
			unencrypted.write(z)
		print('Расшифрованное сообщение ', ''.join(b), '\n')
		
		encrypted.close()
		unencrypted.close()

	# Шифрование
	elif (int(access) == 2):
		bits = 1024  # бит ключа
		msg = open("text.txt", "r")

		encrypted = open("encrypt.txt", "w")

		ac = 1
		while (ac):
			print('			Введите p: ')
			p = int(input())
			if (fermatPrimalityTest(p)):
				ac = 0
			else:
				print('\np не простое!\n')
				ac = 1

		ac = 1
		while (ac):
			print('			Введите q: ')
			q = int(input())
			if (fermatPrimalityTest(q)):
				ac = 0
			else:
				print('\nq не простое!\n')
				ac = 1

		n = p * q

		print('			Введите e: ')
		e = int(input())

		d, n = closeKey(e, p, q)  # генерация закрытого ключа
		a = crypt(msg.read(), e, n)
		print('\n\n\n', 'p = ', p,'\n', 'q = ', q, '\n', 'e = ', e, '\n')

		for i in a: # запись в encrypt.txt
			encrypted.write(str(i))
			encrypted.write(' ')
		encrypted.close()
		encrypted = open("encrypt.txt", "r")

		c = encrypted.read().split()

		print('Открытый ключ: ', (e, p * q), '\n')  # открытый ключ
		print('Закрытый ключ: ', d, '\n' )  # закрытый ключ
		b = decrypt(c, d, n)

		print('Зашифрованное сообщение в файле encrypt.txt')
		msg.close()
		encrypted.close()
	else: 
		print('Введите 1, 2 или 3, выбрав этим самым соответсвующий мод программы!')
		
if __name__ == "__main__":
	main()