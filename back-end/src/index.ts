import { Request, Response } from 'express';
import express from 'express';

let app = express();
app.get('/', (req: Request, res: Response) => {
	res.send('hello world');
});

app.listen(5050, () => {
	console.log('start listening');
});
