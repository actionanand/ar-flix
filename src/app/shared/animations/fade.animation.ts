import { animate, query, state, style, transition, trigger } from "@angular/animations";

export const SLIDE_FADE = 
  trigger('slideFade', [
    state('void', style({ opacity: 0 })),
    transition('void <=> *', [animate('1s')])
  ]);


export const FADE_ANIMATION =
  trigger('fadeAnimation', [
    transition('* => *', [
      query(':enter', 
        [
          style({ opacity: 0 })
        ],
        { optional: true }),

      query(':leave', 
        [
          style({ opacity: 1 }),
          animate('0.5s', style({ opacity: 0 }))
        ],
        { optional: true }
      ),

      query(':enter',
        [
          style({ opacity: 0 }),
          animate('0.5s', style({ opacity: 1 }))
        ],
        { optional: true }
      )
    ])
  ]);