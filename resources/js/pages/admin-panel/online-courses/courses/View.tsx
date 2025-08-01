import AppLayout from '@/layouts/app-layout';
import { Link, Head } from '@inertiajs/react';

// react-bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// project-imports
import MainCard from '@/components/MainCard';
import CourseListCard from '@/sections/admin-panel/online-courses/courses/CourseListCard';

// assets
import CourseImg1 from '@assets/images/admin/img-course-1.png';
import CourseImg2 from '@assets/images/admin/img-course-2.png';
import CourseImg3 from '@assets/images/admin/img-course-3.png';
import CourseImg4 from '@assets/images/admin/img-course-4.png';
import CourseImg5 from '@assets/images/admin/img-course-5.png';
import CourseImg6 from '@assets/images/admin/img-course-6.png';
import CourseImg7 from '@assets/images/admin/img-course-7.png';
import CourseImg8 from '@assets/images/admin/img-course-8.png';

interface Course {
  title: string;
  rate: number;
  duration: string;
  teacher: string;
  student: string;
  tag?: string;
  img: string;
}

const courseList: Course[] = [
  {
    img: CourseImg1,
    title: 'Bootstrap 5 Beginner Course',
    rate: 4.8,
    duration: '10 Months',
    teacher: 'Jimmy Morris',
    student: '120+',
    tag: 'FREE'
  },
  { img: CourseImg2, title: 'PHP Training Course', rate: 4.5, duration: '7 Months', teacher: 'Nashid Martines', student: '50+' },
  { img: CourseImg3, title: 'MERN Stack Training Course', rate: 3.9, duration: '4 Months', teacher: 'Jack Ronan', student: '100+' },
  {
    img: CourseImg4,
    title: 'Python Training Course',
    rate: 3.5,
    duration: '6 Months',
    teacher: 'Garrett Winters',
    student: '110+',
    tag: 'FREE'
  },
  { img: CourseImg5, title: 'Web Designing Course', rate: 4.2, duration: '3 Months', teacher: 'Tiger Nixon', student: '130+' },
  { img: CourseImg6, title: 'C Training Course', rate: 4.8, duration: '7 Months', teacher: 'Airi Satou', student: '70+', tag: 'FREE' },
  { img: CourseImg7, title: 'UI/UX Designing Course', rate: 4.6, duration: '4 Months', teacher: 'Sonya Frost', student: '150+' },
  { img: CourseImg8, title: 'SEO Training Course', rate: 4.3, duration: '1 Year', teacher: 'Cedric Kelly', student: '60 +' }
];

// ==============================|| COURSE - VIEW ||============================== //

export default function CourseViewPage() {
  return (
    <AppLayout>
      <Head title="View" />
      <Row>
        <Col xs={12}>
          <MainCard
            title="Course"
            secondary={
              <Link className="btn btn-primary" href="/admin-panel/online-course/course/add">
                Add Courses
              </Link>
            }
          >
            <Row>
              {courseList.map((course, index) => (
                <Col sm={6} lg={4} xxl={3} key={index}>
                  <CourseListCard {...course} />
                </Col>
              ))}
            </Row>
          </MainCard>
        </Col>
      </Row>
    </AppLayout>
  );
}
