FROM python:3.9

ENV FLASK_APP api/messenger.py
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYHONUNBUFFERED 1

WORKDIR /code/

COPY Pipfile Pipfile.lock /code/
RUN pip install pipenv && pipenv install --system

COPY . /code/

EXPOSE 5000
