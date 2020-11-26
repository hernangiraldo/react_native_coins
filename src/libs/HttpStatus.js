export class HttpStatus {
  empty: boolean;
  error: boolean;
  loading: boolean;
  success: boolean;

  constructor() {
    this.empty = false;
    this.error = false;
    this.loading = false;
    this.success = false;
  }

  onInit() {
    return {
      empty: false,
      error: false,
      loading: false,
      success: false,
    };
  }

  onError() {
    return {
      empty: false,
      error: true,
      loading: false,
      success: false,
    };
  }

  onEmpty() {
    return {
      empty: true,
      error: false,
      loading: false,
      success: false,
    };
  }

  onLoading() {
    return {
      empty: false,
      error: false,
      loading: true,
      success: false,
    };
  }

  onSuccess() {
    return {
      empty: false,
      error: false,
      loading: false,
      success: true,
    };
  }
}
