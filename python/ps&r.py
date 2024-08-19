import random

computer = random.randint(1,3)

player = int(input('''===================
Rock Paper Scissors
===================
1) ✊
2) ✋
3) ✌️
Pick a number: '''))

if(player == 1 and computer == 1):
    print('''
You chose: ✊
CPU chose: ✊
Tied!''')
elif(player == 1 and computer == 2):
    print('''
You chose: ✊
CPU chose: ✋
The computer won!''')
elif(player == 1 and computer == 3):
    print('''
You chose: ✊
CPU chose: ✌️
The player won!''')
elif(player == 2 and computer == 1):
    print('''
You chose: ✋
CPU chose: ✊
The player won!''')
elif(player == 2 and computer == 2):
    print('''
You chose: ✋
CPU chose: ✋
Tied!''')
elif(player == 2 and computer == 3):
    print('''
You chose: ✋
CPU chose: ✌️
The computer won!''')
elif(player == 3 and computer == 1):
    print('''
You chose: ✌️
CPU chose: ✊
The computer won!''')
elif(player == 3 and computer == 2):
    print('''
You chose: ✌️
CPU chose: ✋
''')
elif(player == 3 and computer == 3):
    print('''
You chose: ✌️
CPU chose: ✌️
Tied!''')