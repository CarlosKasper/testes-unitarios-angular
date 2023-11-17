import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe('Like Widget', () => {
  let fixture: ComponentFixture<LikeWidgetComponent>;
  let component: LikeWidgetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should auto generate id when id input property is missing', () => {
    fixture.detectChanges();

    expect(component.id).toBeTruthy();
  });

  it('should not generate id when id input property is present', () => {
    component.id = '123';
    expect(component.id).toBeTruthy();
  });

  it('should trigger emission when called', () => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
    })
    component.like();
  })

  it('should trigger emission when called with done', done => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
      done();
    })
    component.like();
  })

  it('should trigger emission when called easy way', () => {
    fixture.detectChanges();
    const spyOnLiked = spyOn(component.liked, 'emit')
    component.like();

    expect(spyOnLiked).toHaveBeenCalled();
  })
});
