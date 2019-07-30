import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { LakbanReworkService } from './lakban-rework.service';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LakbanReworkCmd } from './cmd/lakban-rework-request.command';
import { LakbanRework } from './lakban-rework.entity';
import { Utils } from '@app/shared/utils';

@ApiUseTags('lakban')
@ApiBearerAuth()
@Controller('api/v1/lakban/rework')
export class LakbanReworkController {
    constructor(private readonly lakbanReworkService: LakbanReworkService) {}
    
    @Post()
    @ApiOperation({ title: 'Post LakbanRework', description: 'Save LakbanRework.' })
    @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
    @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
    public async post(@Body() req: LakbanReworkCmd): Promise<any> {
        let process = await this.lakbanReworkService.create(new LakbanRework(req));

        if (!process) {
            return Utils.sendResponseSaveFailed("Lakban Finishgood")
        }

        return process;
    }
}