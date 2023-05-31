import time
import os

# Get the path of the file
filepath = "./output/index.pdf"

# Get the date of the file
timestamp = time.strftime(
    "%m%d",
    time.strptime(
        time.ctime(
            os.path.getctime(filepath)
        )
    )
)

# Rename the file
os.rename(
    filepath, 
    os.path.split(filepath)[0] + "/ver" + timestamp + os.path.split(filepath)[1]
)