from puzzle_input import *

commands = data.split('\n')

#  Part One
def answer_part_one(arr, acc = 0,i = 0):
    # False if hits an infinity loop, True if executes until the end of the list 
    # Always returns the latest value of acc
           
    seen = dict()    
    while i not in seen:
        command, arg = arr[i].split(' ')
        # Because both nop and acc always increment i by one
        i_delta = int(arg) if command == 'jmp' else 1
        if command == 'acc': acc += int(arg)
        seen[i] = 1
        i += i_delta
        if i == len(arr) - 1: return (True, acc)
    return (False, acc) 


def answer_part_two(arr, acc = 0,i = 0):
    seen = dict()
    while i not in seen:
        command, arg = arr[i].split(' ')
        # Because both nop and acc always increment i by one
        i_delta = int(arg) if command == 'jmp' else 1
        if command == 'acc':
            acc += int(arg)            
        else:
            # Evaluate an alternate jmp or nop command
            command2 = 'nop' if command == 'jmp' else 'jmp'            
            alt_arr = arr.copy()
            alt_arr[i] = f'{command2} {arg}'
            success = answer_part_one(alt_arr,0,i)

            if success[0]:
                # We made it to the end of the program
                acc += success[1]
                return (True, acc)

        # Execute original command
        seen[i] = 1
        i += i_delta                
    
    return (False, acc) 


answer1 = answer_part_one(commands)
print(f'Answer part one: {answer1[1]}')

answer2 = answer_part_two(commands)
print(f'Part two successfull?: {answer2[0]}')
print(f'Acc value: {answer2[1]}')



