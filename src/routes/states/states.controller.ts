import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LgaDocument, Lga } from 'src/Schema/Lga.Schema';
import { State, StateDocument } from 'src/Schema/State.Schema';
import { readFile } from 'fs';
import StateJson from '../../../states.json';
import LgaJson from '../../../lgas.json';
import { Response } from 'express';
import { Return } from 'src/utils/Returnfunctions';
import { ILga, IState } from 'src/Types/ILga';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { join } from 'path';

@Controller('states')
export class StatesController {
  constructor(
    @InjectModel(State.name) private stateModel: Model<StateDocument>,
    @InjectModel(Lga.name) private lgaModel: Model<LgaDocument>,
  ) {}

  @ApiTags('STATE')
  @Post('create')
  async createState(@Res() res: Response) {
    const returnStatement = Return({
      error: false,
      statusCode: 201,
    });
    const states = await this.stateModel.find();
    if (states.length > 0) {
      returnStatement.error = true;
      returnStatement.statusCode = 400;
      returnStatement.errorMessage = 'States already created';

      res.status(returnStatement.statusCode).send(returnStatement);
      return;
    }
    // read the json file
    readFile(join(process.cwd(), 'states.json'), async (err, contents) => {
      if (err) {
        returnStatement.error = true;
        returnStatement.statusCode = 400;
        returnStatement.errorMessage =
          'There was an error while reading the json file';
        return;
      }

      const json = JSON.parse(contents.toString()) as Array<IState>;
      for (let i = 0; i < json.length; i++) {
        const obj = json[i].info;
        const newState = await this.stateModel.create(obj);
        console.log(`state inserted ${i}`);
      }
      returnStatement.error = false;
      returnStatement.statusCode = 200;
      returnStatement.successMessage = 'States inserted Correctly';
    });

    res.status(returnStatement.statusCode).send(returnStatement);
  }

  @ApiTags('STATE')
  @Post('create/lga')
  async createLgas(@Res() res: Response) {
    const returnStatement = Return({
      error: false,
      statusCode: 201,
    });
    const lgas = await this.lgaModel.find();
    if (lgas.length > 0) {
      returnStatement.error = true;
      returnStatement.statusCode = 400;
      returnStatement.errorMessage = 'lgas already created';

      res.status(returnStatement.statusCode).send(returnStatement);
      return;
    }
    // read the json file
    readFile(join(process.cwd(), 'lgas.json'), async (err, contents) => {
      if (err) {
        returnStatement.error = true;
        returnStatement.statusCode = 400;
        returnStatement.errorMessage =
          'There was an error while reading the json file';
        return;
      }

      const json = JSON.parse(contents.toString()) as Array<ILga>;
      for (let i = 0; i < json.length; i++) {
        const obj = json[i];
        const newLga = await this.lgaModel.create(obj);
        console.log(`state inserted ${i}`);
      }
      returnStatement.error = false;
      returnStatement.statusCode = 200;
      returnStatement.successMessage = 'Lga inserted Correctly';
    });

    res.status(returnStatement.statusCode).send(returnStatement);
  }

  @ApiTags('STATE')
  @Get('')
  async getStates(@Res() res: Response) {
    const states = await this.stateModel.find();
    const rt = Return({
      error: false,
      statusCode: 200,
      successMessage: 'States returned',
      data: states,
    });

    res.status(rt.statusCode).send(rt);
  }

  @ApiTags('STATE')
  @ApiParam({ name: 'state' })
  @Get('lgas/:state')
  async getLga(@Res() res: Response, @Param() param: any) {
    const lgas = await this.lgaModel.find({ State: param['state'] });
    const rt = Return({
      error: false,
      statusCode: 200,
      successMessage: 'Lgas returned',
      data: lgas,
    });

    res.status(rt.statusCode).send(rt);
  }
}
