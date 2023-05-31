import time
import os
import shutil


# Get the path of the file
filepath = "./output/index.pdf"

# Get the date of the file
timestamp = time.strftime("%m%d", time.strptime(time.ctime(os.path.getctime(filepath))))

# Copy the file

shutil.copyfile(
    filepath,
    os.path.split(filepath)[0] + "/ver" + timestamp + os.path.splitext(filepath)[1],
)
