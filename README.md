On Windows OS with powershell, open 3 terminal and run:

1. In the first terminal run:
```
node --watch .\index.js
```

2. For the second terminal run:
```
$env:PORT=4000
node --watch .\index.js
```

3. For the third terminal run:
```
$env:PORT=5000
node --watch .\index.js
```

If you are on linux mechine i know you can figure out on your on 😋

[references](https://www.youtube.com/watch?v=Yy7c-j681BA)