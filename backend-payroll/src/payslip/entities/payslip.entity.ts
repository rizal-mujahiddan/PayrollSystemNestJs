import { PayslipStatus } from 'src/common/enums/payslip-status.enum';
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    NumericType
  } from 'typeorm';

@Entity()
export class Payslip {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column("decimal")
    gross_salary:number;

    @Column({
        type:"decimal",
        default:0,
    })
    overtime_amount:number;

    @Column({type:'decimal',default:0})
    net_salary:number;

    @Column({
        type:'varchar',
        default:PayslipStatus.PENDING
    })
    status:PayslipStatus;

    @Column("datetime")
    created_at:Date;

    @Column("simple-json",{
        nullable:true
    })
    allowances:{
        allowance_meal?: number,            // tunjangan makan
        allowance_transport?: number,       // tunjangan transport
        allowance_position?: number,        // tunjangan jabatan
        allowance_attendance?: number,      // tunjangan kehadiran
        allowance_communication?: number,   // pulsa / komunikasi
        allowance_health?: number,          // tunjangan kesehatan tambahan
        allowance_service_year?: number,    // masa kerja
        allowance_education?: number,       // pendidikan
        allowance_performance?: number,     // kinerja
        thr?: number,                       // tunjangan hari raya (THR)
    };

    @Column("simple-json",{
        nullable:true
    })
    deductions: {
        bpjs_kesehatan_employee?: number,   // 1% dari gaji (karyawan)
        bpjs_ketenagakerjaan_jht?: number,  // 2% dari gaji (karyawan)
        bpjs_ketenagakerjaan_jp?: number,   // 1% dari gaji (karyawan)
        koperasi?: number,                  // potongan koperasi karyawan
        pph21?: number,                     // pajak penghasilan
        loan?: number,                      // pinjaman karyawan
        late_penalty?: number,              // telat / mangkir
        absence_penalty?: number,           // absen tanpa keterangan
        other_deductions?: number           // potongan lain-lain
      };

    @Column("simple-json",{
        nullable:true
    })
    tax_details: {
        method?: string,
        ptpkp?: number,
        taxable_income?: number,
        pph21_monthly?: {
          bracket_5?: number,
          bracket_15?: number,
          bracket_25?: number,
          bracket_30?: number,
          bracket_n35?: number
        },
        total_pph21?: number,
        adjustment?: number
    }  
}
