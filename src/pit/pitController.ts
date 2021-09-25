import { Request, Response, NextFunction, Router } from 'express';
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

import PitNotFoundException from '../exceptions/PitNotFoundException';
import Controller from '../interfaces/controllerInterface';
import CreatePitDto from './pitDto';
import IPit from './pitIterface';
import pitModel from './pitModel';

class PostController implements Controller {
    public path = '/pits';
    public router = Router();
    private pit = pitModel;

    constructor() {
        this.initializeRoutes();
    }


    private initializeRoutes() {
        this.router.get(this.path, this.getAllPits);
        this.router.get(`${this.path}/:id`, this.getPitById);
        this.router
            .all(`${this.path}/*`)
            .patch(`${this.path}/:id`, this.modifyPit)
            .delete(`${this.path}/:id`, this.deletePit)
            .post(this.path, jsonParser, this.createPit)
            .options(this.path, this.handleOption)
    }

    private getAllPits = async (request: Request, res: Response) => {
        const posts = await this.pit.find();
        //   .populate('author', '-password');
        res.set('Content-Type', 'application/json');
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.send(posts);
    }

    private getPitById = async (request: Request, res: Response, next: NextFunction) => {
        const id = request.params.id;
        const pit = await this.pit.findById(id);
        if (pit) {
            res.send(pit);
        } else {
            next(new PitNotFoundException(id));
        }
    }

    private modifyPit = async (request: Request, res: Response, next: NextFunction) => {
        const id = request.params.id;
        const pitData: IPit = request.body;

        const pit = await this.pit.findByIdAndUpdate(id, pitData, { new: true });
        if (pit) {
            res.set('Content-Type', 'application/json');
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', '*');
            res.set('Access-Control-Allow-Headers', '*');
            res.send(pit);
        } else {
            next(new PitNotFoundException(id));
        }
    }

    private createPit = async (request: Request, res: Response) => {
        const postData: CreatePitDto = request.body;

        const createdPost = new this.pit(postData);
        const savedPost = await createdPost.save();

        res.set('Content-Type', 'application/json');
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.send(savedPost);
    }

    private deletePit = async (request: Request, res: Response, next: NextFunction) => {
        const id = request.params.id;
        
        const successResponse = await this.pit.findByIdAndDelete(id);
        if (successResponse) {
            res.set('Content-Type', 'application/json');
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', '*');
            res.set('Access-Control-Allow-Headers', '*');
            res.send(200);
        } else {
            next(new PitNotFoundException(id));
        }
    }

    private handleOption = async (request: Request, res: Response) => {
        res.set('Content-Type', 'application/json');
        // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');

        res.send(204);
    }
}

export default PostController;
