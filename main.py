"""
This code was taken from the tutorial at 
https://www.devdungeon.com/content/make-discord-bot-python
"""

import discord

# Keys
TOKEN = 'token'

# Global Variables
client = discord.Client()
prefix = '!'

@client.event
async def on_message(message):
    # Behavior for bot replying to itself
    if message.author == client.user:
        return

    if message.content.startswith(prefix + 'hello'):
        msg = 'Hello {0.author.mention}'.format(message)
        await client.send_message(message.channel, msg)

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

client.run(TOKEN)