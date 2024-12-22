Make a venv like this

python3 -m venv .venv


Activate the venv

source .venv/bin/activate


To download the requiremnts

pip install -r requirements.txt


Then to run the fastAPI project

uvicorn main:app --reload