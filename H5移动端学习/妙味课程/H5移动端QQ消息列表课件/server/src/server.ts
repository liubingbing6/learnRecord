import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import users from './users';
import message from './message';

const app = express();

app.use( (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
} );

app.get('/', (req: Request, res: Response) => {

    let n: number = req.query.n || 20;
    n = Number(n);

    let newMessage: Array<string> = message.sort( (): number => {
        return Math.random() - 0.5;
    } ).filter( (data: string, index: number): boolean => {
        if (index < n) {
            return true;
        }
    } );

    let newUsers = users.sort((): number => {
        return Math.random() - 0.5;
    }).filter( (user: String, index: Number): boolean => {
        if (index < n) {
            return true;
        }
    }).map( (user: String, index: number): Object => {
        return {
            username: user,
            avatar: 'img/avatar/avatar'+(Math.round(Math.random()*7))+'.jpg',
            new_message: newMessage[index],
            message_number: Math.floor(Math.random() * 100),
            date_time: Date.now() - ( Math.random() * 10000000000),
        }
    } ).sort( (a: any, b: any): number => {
        return b.date_time - a.date_time;
    } );

    res.send( JSON.stringify(newUsers) );

});

app.listen(8888);
