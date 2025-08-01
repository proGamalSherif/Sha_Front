import { ReadBranchDTO } from "../branch/read-branch-dto";

export interface ReadCityDTO {
    id:number;
    cityName:string;
    branches:ReadBranchDTO[];
}
