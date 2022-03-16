FROM ubuntu:18.04
LABEL maintainer="Minjae <alswosp0206@naver.com>"
# install python
COPY . /app
WORKDIR /app
RUN apt-get update \
	&& apt-get install -y python3 \
	&& apt-get install -y python3-pip 
RUN pip3 install -r requirement.txt \
	&& pip3 install pytz
CMD ["python3", "main.py"]

