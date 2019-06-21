const refreshService = async (req) => {
  return this.db.refresh();
}

export default refreshService;
