import uuid
import typing
import random


class FieldValue:
    def generate(self) -> str:
        raise NotImplementedError()


class UUID(FieldValue):
    def generate(self) -> str:
        return f'{uuid.uuid4()}'


class DuplicatedString(FieldValue):
    def __init__(self, min_length: int, max_length: int, catchphrase: str):
        super()
        self.min_length = min_length
        self.max_length = max_length
        self.catchphrase = catchphrase
    
    def generate(self) -> str:
        output = ''

        for index in range(random.randint(self.min_length, self.max_length)):
            output += self.catchphrase[index % len(self.catchphrase)]

        return output
    

class Description(DuplicatedString):
    def __init__(self, min_length: int, max_length: int):
        super().__init__(min_length, max_length, 'Super Hot Product Description. ')


class ChoicedString(FieldValue):
    def __init__(self, max_length: int, variants: list):
        super()
        self.variants = variants
        self.max_length = max_length
    
    def generate(self) -> str:
        output = ''

        for _ in range(random.randint(1, len(self.variants))):
            random_word = random.choice(self.variants)

            if len(output + random_word) >= self.max_length:
                break
                
            output += random_word
        
        return output


class ProductName(ChoicedString):
    def __init__(self, max_length: int):
        product_words = [
            'Awesome', 
            'Hot',
            'Cold',
            'Helph',
            'Toothpaste',
            'Cream',
            'Acid',
        ]
        super().__init__(max_length, product_words)


class CompanyName(ChoicedString):
    def __init__(self, max_length: int):
        company_words = [
            'Roche',
            'Inc',
            'Spots',
            'Corp',
            'X',
            'Investments',
            'Help',
        ]
        super().__init__(max_length, company_words)


class Decimal(FieldValue):
    def __init__(self, int_length: int, float_length: int):
        super()
        self.int_length = int_length
        self.float_length = float_length
    
    def generate(self) -> str:
        int_part = random.randint(0, self.int_length)
        float_part = random.randint(0, self.float_length)
        return f'{int_part}.{float_part}'


class CurrencyCode(FieldValue):
    def __init__(self):
        super()
        self.currency_codes = [
            'Bitcoin',
            'USD',
            'BYN',
        ]
    
    def generate(self) -> str:
        return random.choice(self.currency_codes)


class Price(FieldValue):
    def __init__(self, int_length: int, float_length: int):
        super()
        self.decimal_generator = Decimal(int_length, float_length)
        self.code_generator = CurrencyCode()
    
    def generate(self) -> str:
        decimal = self.decimal_generator.generate()
        code = self.code_generator.generate()
        return f'{{\"value\": {decimal}, \"currency\": {code}}}'


class PersonName(FieldValue):
    def __init__(self):
        super()
        self.names = [
            'Erich',
            'Maria',
            'Remark',
            'Rembrant',
            'Yahor',
            'Anton',
            'Victor',
            'Alex',
        ]
    
    def generate(self) -> str:
        return random.choice(self.names)
    

class PhoneNumber(FieldValue):
    def __init__(self, country_code: str = '+37529', length: int = 6):
        super()
        self.country_code = country_code
        self.length = length
    
    def generate(self) -> str:
        output = self.country_code

        for _ in range(self.length):
            output += str(random.randint(0, 10))
        
        return output


class IntegerGenerator(FieldValue):
    def __init__(self, min_value: int, max_value: int):
        super()
        self.min_value = min_value
        self.max_value = max_value
    
    def generate(self) -> int:
        return str(random.randint(self.min_value, self.max_value))


def generate_line(specification: typing.Dict[str, FieldValue],
                      sep=';', end='\n') -> str:
    line = ''

    generators = list(specification.values())
    for generator in generators[:-1]:
        line += generator.generate() + sep
    line += generators[-1].generate()
    
    return line + end


def generate_header(specification: typing.Dict[str, FieldValue],
                    sep=';', end='\n') -> str:
    header = ''

    fields = list(specification.keys())
    for field in fields[:-1]:
        header += field + sep
    header += fields[-1]
    
    return header + end


def generate_csv(specification: typing.Dict[str, FieldValue],
                 lines: int= 100, sep=';', end='\n') -> str:
    csv = generate_header(specification, sep=sep, end=end)

    for _ in range(lines):
        csv += generate_line(specification, sep=sep, end=end)
    
    return csv
