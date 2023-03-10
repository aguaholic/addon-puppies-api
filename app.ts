import express from 'express';
import { Request, Response, Application } from 'express';
import { db } from './db';
import { RequestBody, ResquestPuppy } from './types';
import { nextId } from './utils';

const app: Application = express();
app.use(express.json());

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'it works as it should' });
});

app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).json({ db: db });
});

app.get('/api/puppies/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const puppy = db.find(item => item.id === Number(id));

  return res.status(200).send(puppy);
});

app.post('/api/puppies', (req: RequestBody<ResquestPuppy>, res: Response) => {
  const { name, breed, birthDate } = req.body;

  const newPuppy = {
    id: nextId(db),
    name,
    breed,
    birthDate,
  }
  db.push(newPuppy);
  
  return res.status(201).send(db);
});

app.put('/api/puppies/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, breed, birthDate } = req.body;

  const newDb = db.filter(puppy => puppy.id !== Number(id))

  const newPuppy = {
    id: Number(id),
    name,
    breed,
    birthDate,
  }

  newDb.push(newPuppy);

  return res.status(200).send(newDb);
});

app.delete('/api/puppies/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const newDb = db.filter(puppy => puppy.id !== Number(id));
  
  return res.status(200).send(newDb);
});

export default app;
