line=$(lsof -i :3000 | grep node)
pid=${line: 10: 5}
kill -9 $pid
cd ../react-app
npm start