# Setup
1. Update the emotidev.service with the appropriate WORKDIR (Emoticoach backend directory)
2. Copy THE unit service (emotidev.service) to '/etc/systemd/system'
3. systemctl daemon-reload
4. systemctl start emotidev.service 
