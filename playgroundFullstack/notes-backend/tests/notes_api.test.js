const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Note = require("../models/note");
const helper = require("./tests_helper");

const initialNotes = helper.initialNotes;

beforeEach(async () => {
  await Note.deleteMany({});
  
  const noteObjects = initialNotes.map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("All notes are returned", async () => {
  const response = await api.get("/api/notes");
  expect(response.body).toHaveLength(initialNotes.length);
});

test("A specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");
  const contents = response.body.map((reponse) => reponse.content);
  expect(contents).toContain("Browser can execute only JavaScript");
});

test("A valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);
  expect(contents).toContain("async/await simplifies making async calls");
});

test("Note without content should not be added", async () => {
  const newNote = new Note({
    important: false,
  });

  await api.post("/api/notes").send(newNote).expect(400);

  const notes = await helper.notesInDb();

  expect(notes).toHaveLength(initialNotes.length);
});

test("A specific note can be viewed", async () => {
  const notesAtStart = await helper.notesInDb();

  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultNote.body).toEqual(noteToView);
});

test("A note can be deleted", async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelte = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelte.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(notesAtStart.length - 1);

  const contents = notesAtEnd.map((r) => r.content);

  expect(contents).not.toContain(noteToDelte.content);
});

afterAll(async () => {
  await mongoose.connection.close();
});
