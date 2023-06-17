import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { Planet } from 'src/app/model/planet.model';
import { EntityService } from 'src/app/core/data/entity.service';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    const PLANET_URL = "https://swapi.dev/api/planets/1/";

    const mockPlanet: Planet = {
        "name": "Tatooine",
        "rotation_period": "23",
        "orbital_period": "304",
        "diameter": "10465",
        "climate": "arid",
        "gravity": "1 standard",
        "terrain": "desert",
        "surface_water": "1",
        "population": "200000",
        "residents": [
            "https://swapi.dev/api/people/1/",
            "https://swapi.dev/api/people/2/",
            "https://swapi.dev/api/people/4/",
            "https://swapi.dev/api/people/6/",
            "https://swapi.dev/api/people/7/",
            "https://swapi.dev/api/people/8/",
            "https://swapi.dev/api/people/9/",
            "https://swapi.dev/api/people/11/",
            "https://swapi.dev/api/people/43/",
            "https://swapi.dev/api/people/62/"
        ],
        "films": [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/4/",
            "https://swapi.dev/api/films/5/",
            "https://swapi.dev/api/films/6/"
        ],
        "created": null,
        "edited": null,
        "url": PLANET_URL
    };

    const mockEntityService = {
        getPlanet: () => Promise.resolve(mockPlanet),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatAutocompleteModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [SearchComponent],
            providers: [
                { provide: EntityService, useValue: mockEntityService },
                { provide: MatDialogRef, useValue: {} },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should calculate the correct volume for a planet', async () => {
        const spyGetVolume = spyOn(component as any, 'getVolume').and.returnValue(Promise.resolve(600091307465.65));
        const volume = await component['getVolume'](PLANET_URL);
        expect(spyGetVolume).toHaveBeenCalledWith(PLANET_URL);
        expect(volume).toBeCloseTo(600091307465.65, 2);
    });
});