import {
  ServiceSectionSelf,
  SectionTitle,
  CardsContainer,
  Card,
  CardTitle,
  CardContent,
} from "./styled";
import { pathPublic } from "@/routers/helpers";
import { Link } from "react-router-dom";

interface HeadOfDepartmentDataType {
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  phone_number: string;
}

interface DepartmentDataType {
  id: number;
  name: string;
  slug: string;
  head_of_department: HeadOfDepartmentDataType;
}

interface MyComponentProps {
  departmentData: DepartmentDataType[]; // Массив объектов типа Item
}

const FacultySection: React.FC<MyComponentProps> = ({ departmentData }) => {
  return (
    <ServiceSectionSelf>
      <SectionTitle>Şöbələr</SectionTitle>

      <CardsContainer>
        {departmentData.map((department) => (
          <Link
            to={`${pathPublic.department}/${department.slug}`}
            key={department.id}
          >
            <Card>
              <CardTitle>{department.name}</CardTitle>
              <CardContent>
                <p>{department.head_of_department.position}</p>
                <p>
                  {department.head_of_department.last_name}{" "}
                  {department.head_of_department.first_name}
                </p>
              </CardContent>
              <CardContent>
                <p>{department.head_of_department.email}</p>
                <p>{department.head_of_department.phone_number}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardsContainer>
    </ServiceSectionSelf>
  );
};

export default FacultySection;
