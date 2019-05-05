import datetime
import discord
import qrcode
import logging
import sys

# Keys and Constants
TOKEN = ''
BANNED = [
    'porn',
    'xvideos'
]

# Global Logging Configuration
currentTime = datetime.datetime.now()
logging.basicConfig(filename="logs/A4CDiscord.Log." + str(currentTime.year) + "." + str(currentTime.month) + "." +
    str(currentTime.day) + "." + str(currentTime.hour) + "." + str(currentTime.minute) + "." + str(currentTime.second) + ".txt",
    filemode='w', level=logging.DEBUG,
    format='[%(levelname)s] %(name)s: %(asctime)s - %(message)s')
root = logging.getLogger()
root.setLevel(logging.DEBUG)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('[%(levelname)s] %(asctime)s - %(message)s')
handler.setFormatter(formatter)
root.addHandler(handler)

# Global Discord Configuration
client = discord.Client()
prefix = '!'

@client.event
async def on_message(message):
    user = message.author.name + "#" + message.author.discriminator + " (" + \
        message.author.display_name + ")"

    # Behavior for bot replying to itself
    if message.author == client.user:
        return

    if message.content.startswith(prefix + 'hello'):
        msg = 'Hello {0.author.mention}'.format(message)
        logging.info(user + " said hello to the bot.")
        await client.send_message(message.channel, msg)

    if message.content.startswith(prefix + 'qr'):
        input = message.content[4:len(message.content)]
        if len(input) > 1024:
            logging.warn(user + " tried to make too large of a QR code! Length: " + str(len(input)))
            msg = "{0.author.mention}, that's too large of a QR code!".format(message)
            await client.send_message(message.channel, msg)
            return
        if any(x in input.lower() for x in BANNED):
            logging.warn(user + " tried to make a QR code with a banned word! Original message: " + input)
            msg = "{0.author.mention}, your message contained a perverse word!".format(message)
            await client.send_message(message.channel, msg)
            return
        qr = qrcode.QRCode(
            version = 1,
            error_correction = qrcode.constants.ERROR_CORRECT_H,
            box_size = 10,
            border = 4,)
        qr.add_data(input)
        logging.info(user + " made a QR code containing " + input)
        qr.make(fit = True)
        img = qr.make_image()
        img.save("generates/QR.jpg")
        await client.send_file(message.channel, "generates/QR.jpg")

@client.event
async def on_ready():
    logging.info('Logged in as ' + client.user.name)
    logging.info('Current ID is ' + client.user.id)

client.run(TOKEN)