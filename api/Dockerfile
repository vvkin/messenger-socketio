FROM python:3.9

ENV FLASK_APP api/messenger.py
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYHONUNBUFFERED 1

WORKDIR /api/

COPY Pipfile Pipfile.lock /api/
RUN pip install pipenv && pipenv install --system

COPY . /api/

EXPOSE 5000
