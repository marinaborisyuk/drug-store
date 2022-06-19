import generators


spec = {
    'ID': generators.UUID(),
    'name': generators.PersonName(),
    'surname': generators.PersonName(),
    'number': generators.PhoneNumber(),
    'boughtCount': generators.IntegerGenerator(0, 1000),
}
print(generators.generate_csv(spec))