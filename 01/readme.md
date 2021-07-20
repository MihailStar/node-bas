# Caesar cipher CLI tool (Утилита кодирования / декодирования шифром Цезаря)

## Установка

```bash
# Устанавливает зависимости, компилирует
npm i
```

## Опции

```bash
# | Опция        | Значение        | Указание    |
# | ------------ | --------------- | ----------- |
# | -a, --action | encode | decode | обязательно |
# | -s, --shift  | integer         | обязательно |
# | -i, --input  | string          | опционально |
# | -o, --output | string          | опционально |
# | -h, --help   | boolean         | опционально |

node сaesar-cipher-cli <опции>
```

## Использование

```bash
# Кодирует со сдвигом 3, читает из консоли, пишет в консоль, REPL
node сaesar-cipher-cli -a encode -s 3

# Кодирует со сдвигом 3, читает из input.txt, пишет в консоль
node сaesar-cipher-cli -a encode -s 3 -i input.txt

# Кодирует со сдвигом 3, читает из консоли, пишет в output.txt, REPL
node сaesar-cipher-cli -a encode -s 3 -o output.txt

# Кодирует со сдвигом 3, читает из input.txt, пишет в output.txt
node сaesar-cipher-cli -a encode -s 3 -i input.txt -o output.txt


# Декодирует со сдвигом 3, читает из консоли, пишет в консоль, REPL
node сaesar-cipher-cli -a decode -s 3

# Декодирует со сдвигом 3, читает из input.txt, пишет в консоль
node сaesar-cipher-cli -a decode -s 3 -i input.txt

# Декодирует со сдвигом 3, читает из консоли, пишет в output.txt, REPL
node сaesar-cipher-cli -a decode -s 3 -o output.txt

# Декодирует со сдвигом 3, читает из input.txt, пишет в output.txt
node сaesar-cipher-cli -a decode -s 3 -i input.txt -o output.txt


# Выводит справку
node сaesar-cipher-cli -h
```
