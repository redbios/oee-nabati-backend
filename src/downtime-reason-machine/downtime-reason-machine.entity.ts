import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { InitialShift } from '@app/initial-shift/initial-shift.entity';
import { Line } from '@app/line/line.entity';
import { InitialSku } from '@app/initial-sku/initial-sku.entity';
import { User } from '@app/user/user.entity';
import { IDowntimeReasonMachine } from './interface/downtime-reason-machine.interface';
import { Machine } from '@app/machine/machine.entity';
import { DowntimeReason } from '@app/downtime-reason/downtime-reason.entity';
import { DowntimeCategory } from '@app/downtime-category/downtime-category.entity';

@Entity()
export class DowntimeReasonMachine implements IDowntimeReasonMachine {
  constructor(data: IDowntimeReasonMachine) {
    if (!!data) {
      this.id = data.id;
      this.machine = data.machine;
      this.downtime_category = data.downtime_category;
      this.downtime_reason = data.downtime_reason;
    }
  }

  @PrimaryGeneratedColumn() public id: number;
  
  @ManyToOne(type => Machine, machine => machine.downtime_reason_machines)
  public machine: Machine;

  @ManyToOne(type => DowntimeCategory, downtime_category => downtime_category.downtime_reason_machines)
  public downtime_category: DowntimeCategory;

  @ManyToOne(type => DowntimeReason, downtime_reason => downtime_reason.downtime_reason_machines)
  public downtime_reason: DowntimeReason;
}
