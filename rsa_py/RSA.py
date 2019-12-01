import math  # используется для математических формул
import random  # используется для генерации случайных чисел

# Тест Ферма - является ли число простым числом
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

def main():
	print("1 - Автогенерация ключей\n2 - Ввести ключи и шифровать\n3 - Ввести ключи и расшифровать\n")
	access = input() #select mode

	#авто
	if (int(access) == 1):
		bits = 512  # бит ключа
		msg = open("text.txt", "r")

		encrypted = open("encrypt.txt", "w")
		unencrypted = open("decrypt.txt", "w")

		e, p, q = openKey(bits)  # генерация открытого ключа
		d, n = closeKey(e, p, q)  # генерация закрытого ключа

		a = crypt(msg.read(), e, n)
		print('\n\n\n', 'p = ', p,'\n', 'q = ', q, '\n', 'e = ', e, '\n')

		for i in a: #запись в encrypt.txt
			encrypted.write(str(i))
			encrypted.write(' ')
		encrypted.close()
		encrypted = open("encrypt.txt", "r")

		c = encrypted.read().split()

		print('Открытый ключ: ', (e, p*q), '\n')  # открытый ключ
		print('Закрытый ключ: ', d, '\n' )  # закрытый ключ
		b = decrypt(c, d, n)
		print('Расшифрованное сообщение ', b, '\n')

		for j in b:  # записать расшифрованное сообщение в файл
			unencrypted.write(str(j))
		msg.close()
		encrypted.close()
		unencrypted.close()
	#расшифровка
	elif (int(access) == 3): 
		unencrypted = open("decrypt.txt", "w")
		encrypted = open("encrypt.txt", "r")

		#
		p = 11613703314935367732839405034936419359795706368140868226624456385395406352155693364440255401095938299159635247681686613460084012024652896215053235844874079
		q = 10045276985916541981614797502044550826501658923584175848409065881594899588498847727106694082260493709099344691498152164567957232757850531624247920942757551
		n = p * q
		d = 37844138872143323583416889888208688813046385894554966742848355709886242151859904883767722411705676386658466471358207635994929561045175823799152040851274530275014033734073380033821776726598993186471708678301311472295720314282175673845786328950127312023569551467439527457797993438832954619834640810980811732661
		#

		print('\n\n\n', 'p = ', p,'\n', 'q = ', q, '\n', '\n\nЗакрытый ключ: ', d, '\n' )
		c = encrypted.read().split()
		b = decrypt(c, d, n)
		print('Расшифрованное сообщение ', b, '\n')

		for z in b:  # записать расшифрованное сообщение в файл
			unencrypted.write(z)
		
		encrypted.close()
		unencrypted.close()
		
	else: 
		print('Введите 1, 2 или 3, выбрав этим самым соответсвующий мод программы!')
		
if __name__ == "__main__":
	main()