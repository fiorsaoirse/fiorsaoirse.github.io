import {fromEvent, Observable} from "rxjs";
import {filter, mergeMap} from "rxjs/operators";
import {IGitResponse} from "./IGitResponse";
import {IGitResponseInfo} from "./IGitResponseInfo";

const input: HTMLInputElement = document.getElementById('search') as HTMLInputElement;
const ul: HTMLUListElement = document.getElementById('searchResult') as HTMLUListElement;
const label: HTMLLabelElement = document.getElementById('resultCount') as HTMLLabelElement;

const getEvent$: Observable<KeyboardEvent> = fromEvent(input, 'keypress') as Observable<KeyboardEvent>;

const renderResponse = (response: IGitResponseInfo) => {
    const {incomplete_results, items, total_count} = response;
    if (!incomplete_results) {
        label.textContent = `Всего результатов: ${total_count}`;
        items.map((currentElement: IGitResponse) => {
            const liElement: HTMLLIElement = document.createElement('li');
            const href: HTMLAnchorElement = document.createElement('a');
            href.setAttribute('href', currentElement.git_url);
            href.text = currentElement.name;
            liElement.appendChild(href);
            ul.appendChild(liElement);
        });
    }
};

const getRepos = () => {
    return fetch(`https://api.github.com/search/repositories?q=${(input.value).replace(' ', '+')}+in:name`)
        .then(res => res.json(),
            err => console.error(err));
};

const sendRequestToGit$ = getEvent$.pipe(
    filter((event: KeyboardEvent) => event.code === 'Enter'),
    mergeMap((_keypress: KeyboardEvent) => getRepos())
);

sendRequestToGit$.subscribe((result: IGitResponseInfo) => renderResponse(result));
