import time
import os
import shutil
import argparse

parser = argparse.ArgumentParser()

# -db DATABSE -u USERNAME -p PASSWORD -size 20
parser.add_argument("-i", "--name", help="New File Name", default="")

args = parser.parse_args()

# Get the path of the file
filepath = "./output/index.pdf"

# Get the date of the file
timestamp = time.strftime("%m%d", time.strptime(time.ctime(os.path.getctime(filepath))))

# Copy the file

if args.name != "":
    shutil.copyfile(
        filepath,
        os.path.split(filepath)[0]
        + "/"
        + str(args.name)
        + os.path.splitext(filepath)[1],
    )
