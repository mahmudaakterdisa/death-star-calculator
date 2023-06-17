import { HttpParams } from '@angular/common/http';
import { EntityManager } from './entity-manager';
import { Person } from 'src/app/model/person.model';
import { StarWarsEntity } from 'src/app/model/star-wars.model';
import { Planet } from 'src/app/model/planet.model';
import { of } from 'rxjs';
import { EntityBase } from 'src/app/model/entity-base.mode';

describe('EntityManager Service', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let service: EntityManager<EntityBase>;

    const BASE_URL = 'https://swapi.dev/api/people';
    const PLANET_URL = 'https://swapi.dev/api/planets/1';

    const dummyEntityData: StarWarsEntity<Person> = getDummyEntityData();
    const dummySinglePlanetData: Planet = getDummySinglePlanetData();
    const dummySearchResultByNameData: StarWarsEntity<Person> = getDummySearchResultByNameData();

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new EntityManager(httpClientSpy as any, BASE_URL);

        httpClientSpy.get.and.callFake((url: any, options: any) => {
            if (options?.params?.toString().includes('search')) {
                return of(dummySearchResultByNameData);
            } else if (url.includes('planets')) {
                return of(dummySinglePlanetData);
            } else {
                return of(dummyEntityData);
            }
        });
    });

    it('should fetch correct data from the API using get()', async () => {
        const data = await service.get();
        expect(data).toEqual(dummyEntityData);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        expect(httpClientSpy.get.calls.first().args[0]).toBe(BASE_URL);
    });

    it('should fetch correct planet data from the API using getPlanet()', async () => {
        const data = await service.getPlanet(PLANET_URL);
        expect(data).toEqual(dummySinglePlanetData);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        expect(httpClientSpy.get.calls.first().args[0]).toBe(PLANET_URL);
    });

    it('should fetch correct search data from the API using search()', async () => {
        const data = await service.search('Luke');
        expect(data).toEqual(dummySearchResultByNameData);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        expect(httpClientSpy.get.calls.first().args[0]).toBe(BASE_URL);
        expect(httpClientSpy.get.calls.first().args[1].params.toString()).toBe(new HttpParams().set('search', 'Luke').toString());
    });

    // Helper methods for dummy data
    function getDummyEntityData() {
        return {
            count: 1,
            results: [
                {
                    name: 'Luke Skywalker',
                    height: '172',
                    mass: '77',
                    hair_color: 'blond',
                    birth_year: '19BBY',
                    homeworld: 'https://swapi.dev/api/planets/1',
                    films: ['https://swapi.dev/api/films/1'],
                    species: ['https://swapi.dev/api/species/1'],
                    vehicles: ['https://swapi.dev/api/vehicles/1'],
                    starships: ['https://swapi.dev/api/starships/1'],
                    created: null,
                    edited: null,
                    url: 'https://swapi.dev/api/people/1'
                }
            ]
        };
    }

    function getDummySinglePlanetData() {
        return {
            name: 'Tatooine',
            rotation_period: '23',
            orbital_period: '304',
            diameter: '10465',
            climate: 'arid',
            gravity: '1 standard',
            terrain: 'desert',
            surface_water: '1',
            population: '200000',
            residents: ['https://swapi.dev/api/people/1'],
            films: ['https://swapi.dev/api/films/1'],
            created: null,
            edited: null,
            url: 'https://swapi.dev/api/planets/1'
        };
    }

    function getDummySearchResultByNameData() {
        return {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: 'Luke Skywalker',
                    height: '172',
                    mass: '77',
                    hair_color: 'blond',
                    birth_year: '19BBY',
                    homeworld: 'https://swapi.dev/api/planets/1',
                    films: ['https://swapi.dev/api/films/1'],
                    species: ['https://swapi.dev/api/species/1'],
                    vehicles: ['https://swapi.dev/api/vehicles/1'],
                    starships: ['https://swapi.dev/api/starships/1'],
                    created: null,
                    edited: null,
                    url: 'https://swapi.dev/api/people/1'
                }
            ]
        };
    }

});

