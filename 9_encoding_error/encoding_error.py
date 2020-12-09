from puzzle_input import input

numbers = list(map(lambda x: int(x),input.split('\n')))

def get_preamble_sums(arr, size):
    result = dict()
    for num in arr:
        for i in range(size):
            current = arr[i] + num            
            if arr[i] != num and current not in result:
                result[current] = 1
    return result

# Answer part one
i = 0
j = 25
while j < len(numbers):
    preamble = numbers[i:j]
    prev_five_sums = get_preamble_sums(preamble,25)
    if numbers[j] not in prev_five_sums: break
    i += 1
    j += 1

invalid_number = numbers[j]
print(f'Answer part one is: {invalid_number}')

# Answer part two
i = 0
j = 1
acc = numbers[i] + numbers[j]

while i < j:
    if acc == invalid_number:
        found_set = numbers[i:j+1]            
        result = min(found_set) + max(found_set)
        print(f'Answer part two is: {result}')
        break
    elif acc < invalid_number:
        j += 1
        acc += numbers[j]
    else:
        acc -= numbers[i]
        i +=1
    