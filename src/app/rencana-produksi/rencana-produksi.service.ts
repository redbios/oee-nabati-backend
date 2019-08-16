import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RencanaProduksi } from './rencana-produksi.entity';
import { Repository, DeepPartial } from 'typeorm';
import { RencanaProduksiCmd } from './cmd/rencana-produksi.command';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiFindCmd } from './cmd/rencana-produksi-find.command';
import { RencanaProduksiCreateCmd } from './cmd/rencana-produksi-create.command';
import { RencanaProduksiWaitingListCmd } from './cmd/rencana-produksi-waiting-list.command';
import { RencanaProduksiFindShiftCmd } from './cmd/rencana-produksi-find-shift.command';
import { ReworkLineCmd } from '../rework-line/cmd/rework-line-request.command';
import { LakbanFinishgoodCmd } from '../lakban-finishgood/cmd/lakban-finishgood-request.command';
import { BadstockRequestCmd } from '../badstock-timbangan/cmd/badstock-request.command';
import { concat } from 'rxjs';

@Injectable()
export class RencanaProduksiService {
    constructor(@InjectRepository(RencanaProduksi) private readonly rencanaProduksiRepository: Repository<RencanaProduksi>) {}

    public async findAll(): Promise<RencanaProduksi[]> {
      return await this.rencanaProduksiRepository.find({
          relations : ['shift', 'line', 'sku', 'supervisor']
      });
  }
  public async findById(id : number): Promise<any> {
      return await this.rencanaProduksiRepository.findOne({
          where : {
            id : id
          }
      });
  }

  public async findOne(params: RencanaProduksiCmd): Promise<any> {
      let rencanaProduksi: RencanaProduksi;
      
      try {
          rencanaProduksi = await this.rencanaProduksiRepository
                              .createQueryBuilder("rencana_produksi")
                              .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                              .innerJoin("rencana_produksi.shift", "shift")
                              .innerJoin("rencana_produksi.line", "line")
                              .innerJoin("rencana_produksi.sku", "sku")
                              .innerJoin("rencana_produksi.supervisor", "supervisor")
                              .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                              .andWhere("shift.start_time < :value2", {value2 : params.time})
                              .andWhere("shift.end_time >= :value3", {value3 : params.time})
                              .andWhere("line.id = :value4", {value4 : params.line_id})
                              .getOne();
      } catch (error) {}
      if (!rencanaProduksi) {
        return Utils.NULL_RETURN;
      }
      return rencanaProduksi;
  }

  public async findWaitingList(params: RencanaProduksiWaitingListCmd): Promise<any> {
      let rencanaProduksi: RencanaProduksi[];
      
      try {
          rencanaProduksi = await this.rencanaProduksiRepository
                              .createQueryBuilder("rencana_produksi")
                              .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                              .innerJoin("rencana_produksi.shift", "shift")
                              .innerJoin("rencana_produksi.line", "line")
                              .innerJoin("rencana_produksi.sku", "sku")
                              .innerJoin("rencana_produksi.supervisor", "supervisor")
                              .andWhere("rencana_produksi.date_startpo >= :value1", {value1 : params.datetime})
                              .andWhere("line.id = :value2", {value2 : params.lineId})
                              .getMany();
      } catch (error) {}
      if (!rencanaProduksi) {
        return Utils.NULL_RETURN;
      }
      return rencanaProduksi;
  }

  public async findByLineDate(params: RencanaProduksiFindCmd): Promise<any> {
    let rencanaProduksi: RencanaProduksi[];
    
    try {
      if (params.line_id === null || params.line_id === undefined) {
        rencanaProduksi = await this.rencanaProduksiRepository
                            .createQueryBuilder("rencana_produksi")
                            .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                            .innerJoin("rencana_produksi.shift", "shift")
                            .innerJoin("rencana_produksi.line", "line")
                            .innerJoin("rencana_produksi.sku", "sku")
                            .innerJoin("rencana_produksi.supervisor", "supervisor")
                            .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                            .getMany();
      } else {
        rencanaProduksi = await this.rencanaProduksiRepository
                            .createQueryBuilder("rencana_produksi")
                            .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                            .innerJoin("rencana_produksi.shift", "shift")
                            .innerJoin("rencana_produksi.line", "line")
                            .innerJoin("rencana_produksi.sku", "sku")
                            .innerJoin("rencana_produksi.supervisor", "supervisor")
                            .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                            .andWhere("line.id = :value4", {value4 : params.line_id})
                            .getMany();
      }
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.EMPTY_ARRAY_RETURN;
    }
    return rencanaProduksi;
  }

  public async findByLineDateShift(params: RencanaProduksiFindShiftCmd): Promise<any> {
    let rencanaProduksi: RencanaProduksi[];
    
    try {
      if (params.line_id === null || params.line_id === undefined) {
        rencanaProduksi = await this.rencanaProduksiRepository
                            .createQueryBuilder("rencana_produksi")
                            .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                            .innerJoin("rencana_produksi.shift", "shift")
                            .innerJoin("rencana_produksi.line", "line")
                            .innerJoin("rencana_produksi.sku", "sku")
                            .innerJoin("rencana_produksi.supervisor", "supervisor")
                            .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                            .andWhere("shift.id = :value2", {value2 : params.shift_id})
                            .getMany();
      } else {
        rencanaProduksi = await this.rencanaProduksiRepository
                            .createQueryBuilder("rencana_produksi")
                            .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                            .innerJoin("rencana_produksi.shift", "shift")
                            .innerJoin("rencana_produksi.line", "line")
                            .innerJoin("rencana_produksi.sku", "sku")
                            .innerJoin("rencana_produksi.supervisor", "supervisor")
                            .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                            .andWhere("line.id = :value4", {value4 : params.line_id})
                            .andWhere("shift.id = :value2", {value2 : params.shift_id})
                            .getMany();
      }
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.EMPTY_ARRAY_RETURN;
    }
    return rencanaProduksi;
  }
    
  public async create(rencanaProduksi: RencanaProduksiCreateCmd): Promise<RencanaProduksi> {
    try {
      let date_startpo = rencanaProduksi.date.concat(" ").concat(rencanaProduksi.start_po);
      rencanaProduksi.date_startpo = date_startpo;
      return await this.rencanaProduksiRepository.save(rencanaProduksi);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }
    
  public async updateDefectBadstock(params: DeepPartial<BadstockRequestCmd>): Promise<RencanaProduksi> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(params.rencanaProduksiId);
      po.d_defect_qty_karton    += params.weight;
      po.q_defect_losses        = po.d_defect_qty_karton * po.standart_ct;
      po.q_total_quality_losses = po.q_rework_losses + po.q_defect_losses;
      
      return await this.rencanaProduksiRepository.save(po);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }
    
  public async updateRework(params: DeepPartial<ReworkLineCmd>): Promise<RencanaProduksi> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(params.rencanaProduksiId);
      po.e_rework_qty_karton    += params.total;
      po.q_rework_losses        = po.e_rework_qty_karton * po.standart_ct;
      po.q_total_quality_losses = po.q_rework_losses + po.q_defect_losses;
      
      return await this.rencanaProduksiRepository.save(po);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }
    
  public async updateFinishgood(params: DeepPartial<LakbanFinishgoodCmd>): Promise<RencanaProduksi> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(params.rencanaProduksiId);
      po.b_finishgood_qty_karton    = params.total;
      
      return await this.rencanaProduksiRepository.save(po);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }
    
  public async minFinishgood(params: DeepPartial<LakbanFinishgoodCmd>): Promise<RencanaProduksi> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(params.rencanaProduksiId);
      po.b_finishgood_qty_karton    = po.b_finishgood_qty_karton - params.total;
      
      return await this.rencanaProduksiRepository.save(po);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }

}
