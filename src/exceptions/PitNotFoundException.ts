import HttpException from './HttpException';

class PitNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Pit with id ${id} not found`);
  }
}

export default PitNotFoundException;
