##################
### DEPLOYMENT ###
##################

# Base Image
FROM python:slim-bullseye

# Create directory for emoticoach user
RUN mkdir -p /home/emoticoach
WORKDIR /home/emoticoach

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV EMOTICOACH_HOME=/home/emoticoach

# Create emoticoach user
RUN groupadd -r emoticoach && useradd -r -g emoticoach emoticoach

# Clone GitHub repo
RUN apt update && apt install git netcat -y
# RUN git clone https://github.com/kobemaristela/EmotiCoach.git
RUN git clone -b 137-hotfix-permission-and-syntax-fix https://github.com/kobemaristela/EmotiCoach.git

# Update working directory
ENV EMOTICOACH_SERVER=/home/emoticoach/EmotiCoach/backend
WORKDIR $EMOTICOACH_SERVER

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r $EMOTICOACH_SERVER/requirements.txt

# Give permissions to migration script | Removes all the carriage return (\r) characters
RUN sed -i 's/\r$//g'  $EMOTICOACH_SERVER/deployment/scripts/migrate_database.sh
RUN chmod +x  $EMOTICOACH_SERVER/deployment/scripts/migrate_database.sh

# Chown all the files to the emoticoach user
RUN chown -R emoticoach:emoticoach $EMOTICOACH_HOME

# Change to the app user
# USER emoticoach

# Run migrations
ENTRYPOINT ["/home/emoticoach/EmotiCoach/backend/deployment/scripts/migrate_database.sh"]
