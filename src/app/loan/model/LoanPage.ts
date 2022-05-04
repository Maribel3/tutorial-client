import { Loan } from "./Loan";
import { Pageable } from "src/app/core/model/page/Pageable";


export class LoanPage {
    content: Loan[];
    pageable: Pageable;
    totalElements: number;
}