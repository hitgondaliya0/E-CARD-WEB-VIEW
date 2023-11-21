import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ApiResponse } from '../shared/models/ApiResponse';

@Injectable({ providedIn: 'root' })
export class DataserviceService {
	constructor(private http: HttpClient) {}
	API_URL: string = environment.API_URL;
	response: ApiResponse = new ApiResponse();

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json;charset=utf-8',
			// "Origin" : 'localhost:800',
			"ScreenName" : "VerifyOtp",
			"Platform" : "Mobile",
	Accept: 'application/json'
		})
	};

	private handleError(error: any) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log('Error: ' + errorMessage);
		return throwError(errorMessage);
	}

	post(action: string, obj: any): Observable<ApiResponse> {
		return this.http
			.post<ApiResponse>(
				this.API_URL + action,
				JSON.stringify(obj),
				this.httpOptions
			)
			.pipe(catchError(this.handleError));
	}

	get(action: string): Observable<ApiResponse> {
		return this.http
			.get<ApiResponse>(this.API_URL + action, this.httpOptions)
			.pipe(catchError(this.handleError));
	}

	delete(action: string): Observable<ApiResponse> {
		return this.http
			.delete<ApiResponse>(this.API_URL + action, this.httpOptions)
			.pipe(catchError(this.handleError));
	}
}
