import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EstudiantesPage } from './estudiantes.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EstudiantesPage', () => {
  let component: EstudiantesPage;
  let fixture: ComponentFixture<EstudiantesPage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesPage ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(EstudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});